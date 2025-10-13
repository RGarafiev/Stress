import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useModal } from '../../app/providers/ModalProvider';
import { getToken } from '../../app/auth/session';
import { SiteHeader } from '../../components/shared/SiteHeader';
import {BASENAME} from "../../index";

export const GamePage: React.FC = () => {
  const { user, ensureAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useModal();

  // Gate entry: only allow when navigated from CTA with state.entry (any CTA button)
  useEffect(() => {
    const cameFromCta = !!(location.state as any)?.entry;
    if (!cameFromCta) {
      navigate('/', { replace: true });
      return;
    }
    const check = async () => {
      if (!user) {
        const ok = await ensureAuthenticated();
        if (!ok) {
          open('login');
          navigate('/', { replace: true });
        }
      }
    };
    void check();
  }, [user, navigate, open, ensureAuthenticated, location.state]);

  if (!user) return null;
  return <GameCanvas />;
};

const GameCanvas: React.FC = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const initialToken = getToken();
  
  const unityConfig = {
    loaderUrl: `${BASENAME}/stress_game/Build/Build5.loader.js`,
    dataUrl: `${BASENAME}/stress_game/Build/Build5.data.unityweb`,
    frameworkUrl: `${BASENAME}/stress_game/Build/Build5.framework.js.unityweb`,
    codeUrl: `${BASENAME}/stress_game/Build/Build5.wasm.unityweb`,
    streamingAssetsUrl: `${BASENAME}/stress_game/StreamingAssets`,
    companyName: 'DefaultCompany',
    productName: 'Samogochi',
    productVersion: '0.1',
    // Pass JWT as a Unity command-line argument (read via Environment.GetCommandLineArgs())
    arguments: initialToken ? [`--jwt=${initialToken}`] : [],
  } as any;

  const { unityProvider, loadingProgression, isLoaded, sendMessage, addEventListener, removeEventListener } = useUnityContext(unityConfig);

  const progressPercent = useMemo(() => Math.round((loadingProgression || 0) * 100), [loadingProgression]);

  useEffect(() => {
    if (!isLoaded) return;
    const token = getToken();
    if (token) {
      try { sendMessage('API', 'SetToken', token); } catch {}
    }
    const handleRequest = () => {
      const t = getToken();
      if (t) {
        try { sendMessage('API', 'SetToken', t); } catch {}
      }
    };
    addEventListener('RequestAuthToken', handleRequest);
    return () => { removeEventListener('RequestAuthToken', handleRequest); };
  }, [isLoaded, sendMessage, addEventListener, removeEventListener]);

  // disable body scroll while on game page and remove white background
  useEffect(() => {
    window.scrollTo({left: 0, top: 0, behavior: "auto"});
    
    // Save previous styles
    const prev = document.body.style.overflow;
    const prevBg = document.body.style.background;
    const prevHeight = document.body.style.height;
    const prevMargin = document.body.style.margin;
    const prevPadding = document.body.style.padding;
    
    const root = document.getElementById('root');
    const prevRootBg = root?.style.background || '';
    const prevRootHeight = root?.style.height || '';
    const prevRootMargin = root?.style.margin || '';
    const prevRootPadding = root?.style.padding || '';
    
    // Apply game styles
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#000';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    if (root) {
      root.style.background = 'transparent';
      root.style.height = '100vh';
      root.style.margin = '0';
      root.style.padding = '0';
    }
    
    return () => { 
      document.body.style.overflow = prev;
      document.body.style.background = prevBg;
      document.body.style.height = prevHeight;
      document.body.style.margin = prevMargin;
      document.body.style.padding = prevPadding;
      
      if (root) {
        root.style.background = prevRootBg;
        root.style.height = prevRootHeight;
        root.style.margin = prevRootMargin;
        root.style.padding = prevRootPadding;
      }
    };
  }, []);

  // measure header height to place canvas exactly below it
  useEffect(() => {
    const el = document.getElementById('game-header');
    const update = () => setHeaderHeight(el ? Math.ceil(el.getBoundingClientRect().height) : 0);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: '#000',
      overflow: 'hidden',
      zIndex: 1
    }}>
      {/* Fixed Navbar */}
      <div id="game-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <SiteHeader embedded />
      </div>
      
      {/* Loading screen */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'rgba(255,255,255,0.8)',
          zIndex: 500,
          background: '#000',
          fontSize: '24px'
        }}>
          Загрузка игры: {progressPercent}%
        </div>
      )}
      
      {/* Unity canvas container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100
      }}>
        <Unity 
          unityProvider={unityProvider} 
          style={{ 
            width: '100%', 
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0
          }} 
        />
      </div>
    </div>
  );
};


