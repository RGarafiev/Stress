import React, { useMemo, useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useModal } from '../../../app/providers/ModalProvider';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useToast } from '../../../app/providers/ToastProvider';

export const AuthModals: React.FC = () => {
  const { current, close, open } = useModal();
  const auth = useAuth();
  const { push } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [remember, setRemember] = useState(true);
  const [tab, setTab] = useState<'login'|'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const resetFields = () => { setEmail(''); setPassword(''); setConfirmPassword(''); setFullName(''); };

  return (
    <>
      <Modal 
        open={current === 'login'} 
        onClose={() => { close(); resetFields(); }}
        contentStyle={{ background:'transparent', border:'none', boxShadow:'none', padding: 0 }}
      >
        <div style={{ background:'#121212', color:'#ffffff', padding: 24, borderRadius: 20, width: 485, maxWidth: 'calc(100vw - 32px)' }}>
          {/* Tabs */}
          <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 16 }}>
            <button onClick={() => { setTab('login'); setEmail(''); setPassword(''); setConfirmPassword(''); }} style={{ background:'transparent', border:'none', color: tab==='login'?'#ffffff':'#9ca3af', fontFamily:'Comfortaa', fontSize: 16, cursor:'pointer' }}>Вход</button>
            <span style={{ color:'#9ca3af' }}>|</span>
            <button onClick={() => { setTab('register'); setEmail(''); setPassword(''); setConfirmPassword(''); }} style={{ background:'transparent', border:'none', color: tab==='register'?'#ffffff':'#9ca3af', fontFamily:'Comfortaa', fontSize: 16, cursor:'pointer' }}>Регистрация</button>
          </div>

          {/* Form content varies by tab */}
          <div key={tab} style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            {tab === 'login' ? (
              <>
                {/* Email */}
                <div className="auth-field" style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left: 14, top: 6, fontSize: 12, color:'#B3B3B3', pointerEvents:'none', zIndex: 2 }}>Email</span>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="auth-input"
                    type="email"
                    style={{
                      width:'100%', height: 48, border:'none', background:'transparent',
                      color:'#E6E6E6', padding:'18px 44px 10px 14px', fontFamily:'Comfortaa, sans-serif', fontSize: 14,
                      outline:'none'
                    }}
                    inputMode="email"
                    name="auth-email-login"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                  {/* Mail icon */}
                  <span style={{ position:'absolute', right: 10, top: '50%', transform:'translateY(-50%)', opacity: .85 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#BDBDBD" strokeWidth="2"/><path d="M22 6l-10 7L2 6" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>

                {/* Password */}
                <div className="auth-field" style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left: 14, top: 6, fontSize: 12, color:'#B3B3B3', pointerEvents:'none', zIndex: 2 }}>Пароль</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="auth-input"
                    style={{
                      width:'100%', height: 48, border:'none', background:'transparent',
                      color:'#E6E6E6', padding:'18px 44px 10px 14px', fontFamily:'Comfortaa, sans-serif', fontSize: 14,
                      outline:'none'
                    }}
                    name="current-password"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position:'absolute', right: 6, top: '50%', transform:'translateY(-50%)', opacity: .85, background:'transparent', border:'none', cursor:'pointer', padding: 6 }} aria-label="Показать пароль">
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a19.87 19.87 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.86 19.86 0 0 1-3.87 5.14M14.12 9.88a3 3 0 1 1-4.24 4.24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#ffffff" strokeWidth="2"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#BDBDBD" strokeWidth="2"/></svg>
                    )}
                  </button>
                </div>

                {/* Remember me */}
                <div className="auth-remember">
                  <span className="auth-checkbox-wrap">
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="auth-checkbox" />
                    <svg className="auth-checkbox-tick" viewBox="0 0 16 12" aria-hidden="true"><path d="M2 6l4 4 8-8" /></svg>
                  </span>
                  <span className="auth-remember-text">Запомнить меня</span>
                </div>
              </>
            ) : (
              <>
                {/* Full name */}
                <div className="auth-field" style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left: 14, top: 6, fontSize: 12, color:'#B3B3B3', pointerEvents:'none', zIndex: 2 }}>Имя и фамилия</span>
                  <input
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="auth-input"
                    style={{
                      width:'100%', height: 48, border:'none', background:'transparent',
                      color:'#E6E6E6', padding:'18px 44px 10px 14px', fontFamily:'Comfortaa, sans-serif', fontSize: 14,
                      outline:'none'
                    }}
                    name="name"
                    autoComplete="name"
                  />
                  {/* User icon */}
                  <span style={{ position:'absolute', right: 10, top: '50%', transform:'translateY(-50%)', opacity: .85 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="7" r="4" stroke="#BDBDBD" strokeWidth="2"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                </div>

                {/* Email */}
                <div className="auth-field" style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left: 14, top: 6, fontSize: 12, color:'#B3B3B3', pointerEvents:'none', zIndex: 2 }}>Email</span>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="auth-input"
                    type="email"
                    style={{
                      width:'100%', height: 48, border:'none', background:'transparent',
                      color:'#E6E6E6', padding:'18px 44px 10px 14px', fontFamily:'Comfortaa, sans-serif', fontSize: 14,
                      outline:'none'
                    }}
                    inputMode="email"
                    name="auth-email-register"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                  {/* Mail icon */}
                  <span style={{ position:'absolute', right: 10, top: '50%', transform:'translateY(-50%)', opacity: .85 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#BDBDBD" strokeWidth="2"/><path d="M22 6l-10 7L2 6" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>

                {/* Password */}
                <div className="auth-field" style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left: 14, top: 6, fontSize: 12, color:'#B3B3B3', pointerEvents:'none', zIndex: 2 }}>Пароль</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="auth-input"
                    style={{
                      width:'100%', height: 48, border:'none', background:'transparent',
                      color:'#E6E6E6', padding:'18px 44px 10px 14px', fontFamily:'Comfortaa, sans-serif', fontSize: 14,
                      outline:'none'
                    }}
                    name="new-password"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position:'absolute', right: 6, top: '50%', transform:'translateY(-50%)', opacity: .85, background:'transparent', border:'none', cursor:'pointer', padding: 6 }} aria-label="Показать пароль">
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a19.87 19.87 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.86 19.86 0 0 1-3.87 5.14M14.12 9.88a3 3 0 1 1-4.24 4.24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#ffffff" strokeWidth="2"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#BDBDBD" strokeWidth="2"/></svg>
                    )}
                  </button>
                </div>

                {/* Confirm password */}
                <div className="auth-field" style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left: 14, top: 6, fontSize: 12, color:'#B3B3B3', pointerEvents:'none', zIndex: 2 }}>Подтвердите пароль</span>
                  <input
                    type={showPassword2 ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="auth-input"
                    style={{
                      width:'100%', height: 48, border:'none', background:'transparent',
                      color:'#E6E6E6', padding:'18px 44px 10px 14px', fontFamily:'Comfortaa, sans-serif', fontSize: 14,
                      outline:'none'
                    }}
                    name="new-password-confirm"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword2(s => !s)} style={{ position:'absolute', right: 6, top: '50%', transform:'translateY(-50%)', opacity: .85, background:'transparent', border:'none', cursor:'pointer', padding: 6 }} aria-label="Показать пароль">
                    {showPassword2 ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a19.87 19.87 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.86 19.86 0 0 1-3.87 5.14M14.12 9.88a3 3 0 1 1-4.24 4.24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#ffffff" strokeWidth="2"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#BDBDBD" strokeWidth="2"/></svg>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Submit */}
            <Button
              onClick={async () => {
                if (tab==='login') {
                  await auth.signIn(email, password);
                  push('Добро пожаловать!', 'success');
                } else {
                  if (password !== confirmPassword) { push('Пароли не совпадают', 'error'); return; }
                  await auth.signUp(email, password);
                  push('Письмо с подтверждением отправлено', 'info');
                  open('confirm-email');
                }
                close();
              }}
              style={{ background:'#ffffff', color:'#111827', borderRadius: 10, height: 44, fontFamily:'Comfortaa', fontWeight: 600 }}
            >{tab==='login' ? 'Войти' : 'Создать аккаунт'}</Button>

            {/* Divider + link */}
            <div style={{ height: 1, background:'rgba(255,255,255,0.12)', margin:'10px 0' }} />
            <button onClick={() => open('reset-password')} style={{ background:'transparent', border:'none', color:'#9ca3af', alignSelf:'center', cursor:'pointer' }}>Забыли пароль?</button>
          </div>
        </div>
      </Modal>

      <Modal open={current === 'register'} onClose={() => { close(); resetFields(); }} title="Регистрация">
        <div className="col">
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={async () => { await auth.signUp(email, password); push('Письмо с подтверждением отправлено', 'info'); open('confirm-email'); }}>Создать аккаунт</Button>
          </div>
        </div>
      </Modal>

      <Modal open={current === 'reset-password'} onClose={close} title="Восстановление пароля">
        <div className="col">
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={async () => { await auth.requestPasswordReset(email); push('Мы отправили письмо для сброса', 'success'); close(); }}>Отправить</Button>
          </div>
        </div>
      </Modal>

      <Modal open={current === 'confirm-email'} onClose={close} title="Подтверждение email">
        <div className="col">
          <Input label="Код из письма" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <Button onClick={async () => { await auth.confirmEmail(password); push('Email подтверждён', 'success'); close(); }}>Подтвердить</Button>
          </div>
        </div>
      </Modal>

      <Modal open={current === 'profile'} onClose={close} title="Личный кабинет">
        <div className="col">
          <Input label="Новый пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <Button variant="ghost" onClick={() => { /* reset progress placeholder */ push('Прогресс сброшен', 'warning'); }}>Сбросить игру</Button>
            <Button onClick={() => { push('Пароль обновлён', 'success'); close(); }}>Сохранить</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};


