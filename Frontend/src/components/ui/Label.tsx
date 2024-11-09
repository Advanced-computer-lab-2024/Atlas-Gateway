import React, { memo } from "react";
import { twMerge } from "tailwind-merge";
import tw from "tailwind-styled-components";

const labelVariants = {
	primary: "text-text-primary-default",
	default: "text-text-default",
	subdued: "text-text-subdued",
	disabled: "text-text-disabled",
	critical: "text-text-critical",
	warning: "text-text-warning",
	success: "text-text-success",
	interactive: "text-text-interactive",
};

const labelSizes = {
	100: "text-[12px]",
	200: "text-[14px]",
	300: "text-[16px]",
	400: "text-[20px]",
	500: "text-[24px]",
	600: "text-[28px]",
	700: "text-[36px]",
};

const labelWeights = {
	Thin: "font-normal",
	Mid: "font-medium",
	Big: "font-bold",
};

const labelLetterSpacing = {
	100: `tracking-[-0.36px]`,
	200: `tracking-[-0.42px]`,
	300: `tracking-[-0.48px]`,
	400: `tracking-[-0.6px]`,
	500: `tracking-[-0.72px]`,
	600: `tracking-[-0.84px]`,
	700: `tracking-[-1.08px]`,
};

type LabelVariantsEnum = keyof typeof labelVariants;
type LabelWeightsEnum = keyof typeof labelWeights;
type LabelTypographyEnum = keyof typeof labelSizes;

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
	children?: React.ReactNode;
	variant?: LabelVariantsEnum;
	size: LabelTypographyEnum;
	weight: LabelWeightsEnum;
	htmlFor?: string;
}

const BaseLabel = memo(
	tw.label<LabelProps>`
		${({ size, variant, weight, className }) =>
			twMerge(
				labelVariants[variant ?? "default"],
				labelSizes[size],
				labelWeights[weight],
				labelLetterSpacing[size],
				"leading-[140%] cursor-inherit",
				className,
			)}`,
);

const TypographyWeights = ["Thin", "Mid", "Big"];

const TypographyVariants = [100, 200, 300, 400, 500, 600, 700];

type LabelVariant = `${LabelWeightsEnum}${LabelTypographyEnum}`;

type LabelType = React.FC<LabelProps> & {
	[key in LabelVariant]?: React.FC<Partial<LabelProps>>;
};

const Label = BaseLabel as LabelType;

TypographyVariants.forEach((sizeKey) => {
	TypographyWeights.forEach((weightKey) => {
		const variant = `${weightKey}${sizeKey}` as LabelVariant;
		Label[variant] = (props) => (
			<BaseLabel
				{...props}
				weight={weightKey as LabelWeightsEnum}
				size={sizeKey as LabelTypographyEnum}
			/>
		);
	});
});

export default Label as React.FC<LabelProps> & {
	[key in LabelVariant]: React.FC<Partial<LabelProps>>;
};
