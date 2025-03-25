import AddMoneyComponent from '@/components/addMoneyComponent'
import BalanceComponent from '@/components/balanceComponent'
import RecentTransaciton from '@/components/ui/recentTransaction'
import React from 'react'

function TranferPage() {
    return (
        <div className='grid grid-cols-2  my-auto '>
            
            <div className='p-8'>
            <AddMoneyComponent/>
            </div>
            <div className=' p-8 h-full'>
                <div className='p-4'>
                <BalanceComponent  />

                </div>
                <div className='p-4'>
                    <RecentTransaciton/>
                </div>
            </div>
            
        </div>
    )
}

export default TranferPage
