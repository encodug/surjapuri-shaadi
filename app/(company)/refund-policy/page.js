import React from 'react'

function RefundPolicy() {
  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-center font-bold text-3xl py-6'>Refund Policy</h1>
        <p>At SurjapuriShaadi.com, we value your satisfaction and aim to provide the best possible services to our users. We understand that there may be circumstances under which you might seek a refund. This Refund Policy outlines the terms and conditions regarding refunds on our platform</p>
        <ol role='list' className='list-decimal list-outside py-6 space-y-6 marker:font-bold marker:text-lg'>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Refund Eligibility</h3>
                <p>Refunds may be considered under the following circumstances:</p>
                <ul className='list-disc pl-8'>
                    <li>
                        <h4 className='font-semibold'>Payment Errors:</h4> 
                        <p>In case of accidental multiple payments or billing errors, we will assess the situation and, if necessary, process a refund for the excess amount</p>
                    </li>
                    <li>
                        <h4 className='font-semibold'>Unauthorized Transactions:</h4> 
                        <p>If you notice any unauthorized transactions on your account, please report them to us immediately. We will investigate and refund the unauthorized charges.</p>
                    </li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Non-Refundable Services</h3>
                <p>Please note that the following services are non-refundable:</p>
                <ul className='list-disc pl-8'>
                    <li>
                        <h4 className='font-semibold'>Subscription Fees:</h4> 
                        <p>Subscription fees paid for premium memberships or other subscription-based services are non-refundable.</p>
                    </li>
                    <li>
                        <h4 className='font-semibold'>Usage Fees:</h4> 
                        <p>Fees associated with using certain premium features or services on the platform are non-refundable.</p>
                    </li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Requesting a Refund</h3>
                <p>To request a refund, you must contact our customer support team by [mentioning the preferred contact method, e.g., email or phone]. Please provide the following information when requesting a refund:</p>
                <ul className='list-disc pl-8'>
                    <li>
                        <p>Your account details, including your username and email address.</p>
                    </li>
                    <li>
                        <p>A clear description of the issue and the reason for the refund request.</p>
                    </li>
                    <li>
                        <p>Any supporting documentation, such as screenshots or transaction receipts, if applicable.</p>
                    </li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Refund Processing</h3>
                <ul className='list-disc pl-8'>
                    <li>
                        <p>Once we receive your refund request, we will review the information provided and investigate the issue.</p>
                    </li>
                    <li>
                        <p>If your refund request is approved, we will initiate the refund process. The method of refund may vary, depending on the original payment method used.</p>
                    </li>
                    <li>
                        <p>Refunds are typically processed within a reasonable time frame, but the actual timing may depend on factors such as the payment provider and bank processing times.</p>
                    </li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Contact Information</h3>
                <p>If you have any questions or concerns about our Refund Policy, or if you wish to request a refund, please contact our customer support team at [Your Contact Information].</p>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Changes to Refund Policy</h3>
                <p>SurjapuriShaadi.com reserves the right to make changes or updates to this Refund Policy at any time. Any revisions will be posted on our website, and your continued use of our services will constitute your acceptance of the updated policy.</p>
            </li>
        </ol>
        <p>We appreciate your trust in SurjapuriShaadi.com, and we are committed to providing a transparent and fair refund process to ensure the satisfaction of our valued users. If you have any concerns or issues regarding refunds, please do not hesitate to contact us.</p>
    </div>
  )
}

export default RefundPolicy