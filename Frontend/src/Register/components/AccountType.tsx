import { Flex } from '@/components/ui/flex';
import Label from '@/components/ui/Label';
import { EAccountType } from '@/types/enums';
import { Binoculars, HandCoins, Map, Megaphone } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { TFormValues } from '../types';
import { cn } from '@/lib/utils';

const accountTypes = [
	{ label: 'Tourist', value: EAccountType.Tourist, icon: <Binoculars /> },
	{ label: 'Guide', value: EAccountType.Guide, icon: <Map /> },
	{ label: 'Seller', value: EAccountType.Seller, icon: <HandCoins /> },
	{ label: 'Advertiser', value: EAccountType.Advertiser, icon: <Megaphone /> },
];

export default function AccountType() {
	const form = useFormContext<TFormValues>();

	return (
		<>
			{accountTypes.map((type) => (
				<Flex
					key={type.value}
					className={cn(
						'rounded-md w-full h-24 items-center justify-center border bg-card cursor-pointer',
						{
							'bg-gray-300': form?.watch('type') === type.value,
						}
					)}
					onClick={() => form?.setValue('type', type.value)}
					gap="2"
				>
					<Label.Mid500>{type.label}</Label.Mid500>
					{type.icon}
				</Flex>
			))}
			<p className={'text-[0.8rem] font-medium text-destructive h-5'}>
				{form?.formState.errors.type?.message}
			</p>
		</>
	);
}
