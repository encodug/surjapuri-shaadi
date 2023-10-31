import React from 'react'

function Terms() {
  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-center font-bold text-3xl py-6'>Term of Use</h1>
        <p>Welcome to SurjapuriShaadi.com, a regional matrimony website dedicated to helping individuals within the Surjapuri community find their life partners. Before using our platform, please carefully read and understand the following Terms of Use. By accessing or using SurjapuriShaadi.com, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, please do not use our services. </p>
        <ol role='list' className='list-decimal list-outside py-6 space-y-6 marker:font-bold marker:text-lg'>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Eligibility</h3>
                <p>You must be at least 18 years of age to use SurjapuriShaadi.com. By using our services, you represent and warrant that you have the legal capacity to enter into a binding contract. </p>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Registration</h3>
                <ul className='list-disc pl-8'>
                    <li>You are required to provide accurate and up-to-date information during the registration process. </li>
                    <li>You are responsible for maintaining the confidentiality of your login credentials. </li>
                    <li>You agree to immediately notify SurjapuriShaadi.com of any unauthorized use of your account.</li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>User Conduct</h3>
                <ul className='list-disc pl-8'>
                    <li>You agree to use SurjapuriShaadi.com solely for the purpose of seeking a life partner within the Surjapuri community.</li>
                    <li>You will not use the platform for any unlawful, fraudulent, or inappropriate activities. </li>
                    <li>You will not impersonate any other person or entity. </li>
                    <li>You will not engage in any harassment, discrimination, or abusive behavior towards other users. </li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Content and Communication</h3>
                <ul className='list-disc pl-8'>
                    <li>Any content, including text, images, or other media, you upload or share on SurjapuriShaadi.com must not violate any copyrights or intellectual property rights. </li>
                    <li>You are responsible for the accuracy and appropriateness of the information you provide on your profile. </li>
                </ul>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Privacy</h3>
                <p>SurjapuriShaadi.com reserves the right to suspend or terminate your account if you violate these terms of use or engage in any activities that are harmful to other users or the platform. </p>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Disclaimers</h3>
                <p>SurjapuriShaadi.com does not guarantee the accuracy of user profiles or the success of any match. We are not responsible for any interactions or disputes between users.You use the platform at your own risk, and we are not liable for any damages or losses. </p>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Modifications</h3>
                <p>We may update these terms of use from time to time. Your continued use of SurjapuriShaadi.com after any changes constitutes your acceptance of the updated terms. </p>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Governing Law</h3>
                <p>These terms of use are governed by the laws of [Your Jurisdiction], and any disputes will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].</p>
            </li>
            <li>
                <h3 className='font-bold text-lg text-red-600'>Contact Information</h3>
                <p>If you have any questions or concerns regarding these terms of use or the services provided by SurjapuriShaadi.com, please contact us at [Your Contact Information]. By using SurjapuriShaadi.com, you acknowledge that you have read, understood, and agreed to these Terms of Use. We encourage you to review these terms regularly for any updates or changes. Thank you for choosing SurjapuriShaadi.com as your trusted partner in your search for love and companionship within the Surjapuri community.  </p>
            </li>
        </ol>
    </div>
  )
}

export default Terms