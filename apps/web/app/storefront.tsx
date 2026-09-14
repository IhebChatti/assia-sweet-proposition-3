'use client';
import Script from 'next/script';
import {useState} from 'react';
// The existing renderer owns only #app. React owns its shell and script loading.
// Fragment navigation keeps this component mounted for all shop/dashboard screens.
export default function Storefront(){
 const [gsapReady,setGsapReady]=useState(false);
 const [scrollReady,setScrollReady]=useState(false);
 return <><div id="app"><p style={{padding:40,textAlign:'center'}}>Le royaume se prépare…</p></div><div id="toast" role="status" aria-live="polite"/>
 <Script src="/vendor/gsap.min.js" onReady={()=>setGsapReady(true)}/>
 {gsapReady&&<Script src="/vendor/ScrollTrigger.min.js" onReady={()=>setScrollReady(true)}/>}
 {scrollReady&&<Script src="/storefront-runtime.js"/>}
 <noscript>Activez JavaScript pour découvrir la boutique interactive.</noscript></>;
}
