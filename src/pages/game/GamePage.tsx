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

  // Gate entry: only allow when navigated from CTA with state.entry === 'cta'
  useEffect(() => {
    const cameFromCta = (location.state as any)?.entry === 'cta';
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
    loaderUrl: `${BASENAME}/stress_game/Build/Build.loader.js`,
    dataUrl: `${BASENAME}/stress_game/Build/Build.data`,
    frameworkUrl: `${BASENAME}/stress_game/Build/Build.framework.js`,
    codeUrl: `${BASENAME}/stress_game/Build/Build.wasm`,
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
      try { sendMessage('AuthBridge', 'ReceiveToken', token); } catch {}
    }
    const handleRequest = () => {
      const t = getToken();
      if (t) {
        try { sendMessage('AuthBridge', 'ReceiveToken', t); } catch {}
      }
    };
    addEventListener('RequestAuthToken', handleRequest);
    return () => { removeEventListener('RequestAuthToken', handleRequest); };
  }, [isLoaded, sendMessage, addEventListener, removeEventListener]);

  // disable body scroll while on game page
  useEffect(() => {
    window.scrollTo({left: 0, top: 0, behavior: "auto"});
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
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
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundImage: `url("${BASENAME}/images/hero-bg-6bfd80.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(13, 13, 13, 0.65)',
        borderRadius: '0 0 30px 30px'
      }} />
      
      {/* Fixed Navbar */}
      <div id="game-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <SiteHeader embedded />
      </div>
      
      {/* Main Content: Unity canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        // top: headerHeight,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        padding: 0
      }}>
        <div style={{ width: '100%', height: '100%', margin: 0 }}>
          {!isLoaded && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'rgba(255,255,255,0.8)' }}>Загрузка игры: {progressPercent}%</div>
          )}
          <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%', background: '#000' }} />
        </div>
      </div>
    </div>
  );
};


