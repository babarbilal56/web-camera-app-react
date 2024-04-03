import React, { useState } from 'react';
import Header from './../components/Header'
const ConsentView = ({ onConsent }) => {
    const [consentGiven, setConsentGiven] = useState(false);

    const handleConsent = () => {
        setConsentGiven(true);
        // Call the parent component's function to indicate consent has been given
        onConsent();
    };

    return (

        <div>
            <Header />
            <div className="bg-gray-100  flex flex-col  items-center px-4">
                <div className="w-4/5 mt-20">

                    <p className="text-2xl font-bold  mb-4">Consent and Data Policy</p>
                </div>
                <div className="overflow-y-auto w-4/5  mb-4" style={{ height: "33em" }}>

                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut odio
                        efficitur, posuere nisi nec, mattis elit. Mauris ultrices risus nec orci
                        fermentum, ac vestibulum orci sollicitudin. Nulla facilisi. Donec vel mi
                        ultrices, condimentum nisl non, fermentum metus. Duis ac ex sit amet purus
                        aliquet luctus. Sed nec ligula in odio blandit condimentum. In hac habitasse
                        platea dictumst. Duis nec lacinia justo, a tempus lectus. Sed vel leo eget
                        mi malesuada fermentum. In hac habitasse platea dictumst.
                    </p>
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut odio
                        efficitur, posuere nisi nec, mattis elit. Mauris ultrices risus nec orci
                        fermentum, ac vestibulum orci sollicitudin. Nulla facilisi. Donec vel mi
                        ultrices, condimentum nisl non, fermentum metus. Duis ac ex sit amet purus
                        aliquet luctus. Sed nec ligula in odio blandit condimentum. In hac habitasse
                        platea dictumst. Duis nec lacinia justo, a tempus lectus. Sed vel leo eget
                        mi malesuada fermentum. In hac habitasse platea dictumst.<br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut odio
                        efficitur, posuere nisi nec, mattis elit. Mauris ultrices risus nec orci
                        fermentum, ac vestibulum orci sollicitudin. Nulla facilisi. Donec vel mi
                        ultrices, condimentum nisl non, fermentum metus. Duis ac ex sit amet purus
                        aliquet luctus. Sed nec ligula in odio blandit condimentum. In hac habitasse
                        platea dictumst. Duis nec lacinia justo, a tempus lectus. Sed vel leo eget
                        mi malesuada fermentum. In hac habitasse platea dictumst.
                    </p>
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut odio
                        efficitur, posuere nisi nec, mattis elit. Mauris ultrices risus nec orci
                        fermentum, ac vestibulum orci sollicitudin. Nulla facilisi. Donec vel mi
                        ultrices, condimentum nisl non, fermentum metus. Duis ac ex sit amet purus
                        aliquet luctus. Sed nec ligula in odio blandit condimentum. In hac habitasse
                        platea dictumst. Duis nec lacinia justo, a tempus lectus. Sed vel leo eget
                        mi malesuada fermentum. In hac habitasse platea dictumst.
                    </p>
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut odio
                        efficitur, posuere nisi nec, mattis elit. Mauris ultrices risus nec orci
                        fermentum, ac vestibulum orci sollicitudin. Nulla facilisi. Donec vel mi
                        ultrices, condimentum nisl non, fermentum metus. Duis ac ex sit amet purus
                        aliquet luctus. Sed nec ligula in odio blandit condimentum. In hac habitasse
                        platea dictumst. Duis nec lacinia justo, a tempus lectus. Sed vel leo eget
                        mi malesuada fermentum. In hac habitasse platea dictumst.
                    </p>
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut odio
                        efficitur, posuere nisi nec, mattis elit. Mauris ultrices risus nec orci
                        fermentum, ac vestibulum orci sollicitudin. Nulla facilisi. Donec vel mi
                        ultrices, condimentum nisl non, fermentum metus. Duis ac ex sit amet purus
                        aliquet luctus. Sed nec ligula in odio blandit condimentum. In hac habitasse
                        platea dictumst. Duis nec lacinia justo, a tempus lectus. Sed vel leo eget
                        mi malesuada fermentum. In hac habitasse platea dictumst.
                    </p>

                </div>
                <div className='flex flex-row justify-center '>
                    <button className="px-8 py-3 mr-10  border border-blue-500 text-blue-500 rounded ">
                        Decline
                    </button>
                    <button className="px-8 py-3 border  border-red text-white rounded " style={{ backgroundColor: "#50adec" }}>
                        Agree
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ConsentView;