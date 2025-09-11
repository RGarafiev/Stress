import React, { useState } from 'react';
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

  const resetFields = () => { setEmail(''); setPassword(''); };

  return (
    <>
      <Modal open={current === 'login'} onClose={() => { close(); resetFields(); }} title="Вход">
        <div className="col">
          <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <Button onClick={() => open('reset-password')} variant="ghost">Забыли пароль?</Button>
            <Button onClick={async () => { await auth.signIn(email, password); push('Добро пожаловать!', 'success'); close(); }}>Войти</Button>
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


