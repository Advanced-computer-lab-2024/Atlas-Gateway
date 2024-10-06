/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFirstMountState } from "@react-hookz/web";
import { isFunction, isObject } from "lodash";
import { ParsedQuery, StringifyOptions, parse, stringify } from "query-string";
import React, {
	createContext,
	useContext,
	useDebugValue,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type { ParsedQuery } from "query-string";

export type QueryState = {
	searchObject: ParsedQuery<any>;
	updateQuery: UpdateQuery;
	searchString: string;
	deleteQuery: (queryKey?: string) => void;
};

type UpdateQuery = (
	value: any,
	options?: {
		cb?: (search: string) => void;
		replace?: boolean;
		noMerge?: boolean;
	},
) => void;

type UseQueryStringProvider = (init: any) => {
	searchObject: ParsedQuery<string>;
	updateQuery: UpdateQuery;
	searchString: string;
	deleteQuery: (queryKey?: string) => void;
};

type UseQueryString = () => [
	ParsedQuery<any>,
	UpdateQuery,
	string,
	(queryKey?: string) => void,
];

const queryStateCtx = createContext<QueryState>({
	searchObject: {},
	updateQuery: () => {},
	searchString: "",
	deleteQuery: () => {},
});
queryStateCtx.displayName = "QueryStateCtx";

// const QueryStateConsumer = queryStateCtx.Consumer;

export const QueryStateProvider: React.FC<any> = (props) => {
	const { searchObject, updateQuery, searchString, deleteQuery } =
		useQueryStringProvider(props.initialQuery);

	const ctx: QueryState = {
		searchObject,
		updateQuery,
		searchString,
		deleteQuery,
	};

	return (
		<queryStateCtx.Provider value={ctx}>
			{props.children}
		</queryStateCtx.Provider>
	);
};

export const useQueryString: UseQueryString = () => {
	const { searchObject, updateQuery, searchString, deleteQuery } =
		useContext(queryStateCtx);

	return [searchObject, updateQuery, searchString, deleteQuery];
};

export const useQueryStringProvider: UseQueryStringProvider = (init) => {
	const location = useLocation();
	const navigate = useNavigate();

	const { parse: parseQs, stringify: stringifyQs } = qs();

	const [searchObject, setSearchObject] = useState(parseQs(location.search));

	useLayoutEffect(() => {
		setSearchObject(parseQs(location.search));
	}, [location.search]);

	/**
	 * updateQuery
	 * @param {object} value - query string object
	 * @param {object} [options] - update options
	 * @param {function} [options.cb] - callback func
	 * @param {Boolean} [options.replace] - replace history
	 * @param {Boolean} [options.noMerge=false] - don't merge query string
	 */
	const updateQuery: UpdateQuery = (value, options) => {
		const { cb, replace, noMerge } = options || {};

		setSearchObject((s) => {
			const search = noMerge
				? stringifyQs(Object.assign({}, value))
				: stringifyQs(Object.assign({}, s, value));

			if (replace) {
				navigate(
					{ search },
					{
						replace: true,
					},
				);
			} else {
				navigate({ search });
			}

			if (isFunction(cb)) {
				cb(search);
			}

			return parseQs(search);
		});
	};

	const deleteQuery = (queryKey?: string) => {
		if (queryKey) {
			setSearchObject((s: { [x: string]: any }) => {
				const { [queryKey]: deleted, ...restQueries } = s;

				return restQueries;
			});
		} else {
			setSearchObject({});
		}
	};

	const isFirstMount = useFirstMountState();

	useEffect(() => {
		if (isFirstMount) {
			updateQuery(init || {});
		}
	});

	useDebugValue({
		searchString: location.search,
		setSearchObject,
		searchObject,
		updateQuery,
		location,
		history: navigate,
	});

	return {
		searchObject,
		updateQuery,
		searchString: location.search,
		deleteQuery,
	};
};

function qs(opt = {}) {
	const options: StringifyOptions = {
		arrayFormat: "separator",
		arrayFormatSeparator: ":",
		...opt,
	};

	return {
		stringify(o: any) {
			if (isObject(o)) {
				return stringify(o, options);
			}

			throw new Error(`qs cant stringify ${typeof o}`);
		},
		parse(o: any) {
			return Object.assign({}, parse(o, options));
		},
	};
}
