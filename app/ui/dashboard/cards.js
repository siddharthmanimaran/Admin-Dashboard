import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon, } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

const CardWrapper = async () => {
    const { numberOfActors, numberOfFilms, numberOfCustomers, totalPayment, } = await fetchCardData();
    const currency = (totalPayment / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return (
        <>
            <Card title='Actors' value={numberOfActors} type='customers' />
            <Card title='Flims' value={numberOfFilms} type='customers' />
            <Card title='Customers' value={numberOfCustomers} type='customers' />
            <Card title='Payment' value={currency} type='customers' />
        </>
    )
}

export const Card = ({ title, value, type, }) => {
    const Icon = iconMap[type];

    return (
        <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
                {value}
            </p>
        </div>
    )
}


export default CardWrapper