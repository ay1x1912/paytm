import React from 'react'
enum status{
    Success ,
    Failure,
    Pending
  }
interface TransactionComponentProps{
    date:Date
    amount:number,
    
}
function TransactionComponent({date,amount}:TransactionComponentProps) {
    return (
        <div className='flex justify-between border p-4  mb-4 rounded-3xl'>
            <div>
                <p>Recived INR</p>
                {date.toDateString()}
            </div>
            <div>
                {amount}
            </div>
        </div>
    )
}

export default TransactionComponent
