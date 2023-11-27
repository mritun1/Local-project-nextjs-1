"use client"
import React, { useEffect, useState } from 'react'

const AppInstallBtns = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: any) => {
            // Prevent the default installation prompt
            event.preventDefault();
            // Save the event to use it later
            setDeferredPrompt(event);
        };

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []); // Run this effect only once when the component mounts

    const handleInstallClick = () => {
        // Trigger the installation prompt
        if (deferredPrompt) {
            deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the installation');
                    // Optionally, you can perform additional actions after installation
                } else {
                    console.log('User dismissed the installation');
                }

                // Reset the deferredPrompt variable
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <>
            <div className="apps">
                <div>
                    <div onClick={handleInstallClick} >
                        <div style={{ backgroundImage: `url(https://www.computerhope.com/jargon/a/android.png)` }}></div>
                        <div><h3>Android</h3></div>
                    </div>
                </div>
                <div>
                    <div onClick={handleInstallClick} >
                        <div style={{ backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/020/489/291/original/3d-logo-of-apple-iphone-free-png.png)` }}></div>
                        <div><h3>iPhone</h3></div>
                    </div>
                </div>
            </div>

            <div className="appOne">
                <div>
                    <div onClick={handleInstallClick} >
                        <div style={{ backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/2933/2933245.png)` }}></div>
                        <div><h3>Desktop</h3></div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default AppInstallBtns