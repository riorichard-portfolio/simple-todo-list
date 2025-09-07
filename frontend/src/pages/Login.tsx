import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

import LabeledButton from "../components/Labeled-button"
import TypableInput from "../components/Typable-input"
import { useAlertContext } from "../hooks/alert-context-hook";
import { axiosErrorHandler } from "../utils/axios-error-handler";
import { authApi } from "../api/auth";
import Container from "../components/Container";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { showAlert } = useAlertContext()
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await authApi.login({
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || ''
      })
      localStorage.setItem('token', response.data.token)
      // clear input
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";

      showAlert('Login sukses')
      // navigate to todo page
      navigate('/todo')
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      showAlert(errorMessage)
    }
  }

  const handleGoogleOAuth = async ({ credential }: CredentialResponse) => {
    try {
      if (!credential) {
        throw('Google auth gagal')
      }
      const response = await authApi.loginGoogle({ credential })
      localStorage.setItem('token', response.data.token)
      showAlert('Login sukses')
      // navigate to todo page
      navigate('/todo')
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      showAlert(errorMessage)
    }
  }

  return (
    <Container className="items-center flex-col space-y-6" >
      <div className="bg-white shadow-lg rounded-xl w-[375px] p-6 space-y-4">
        <form onSubmit={handleLoginSubmit} >
          <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
          <TypableInput label="Email" type="email" ref={emailRef} />
          <TypableInput label="Password" type="password" ref={passwordRef} />
          <LabeledButton label="Login" />
        </form>
        <p className="flex items-center justify-center space-x-2">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="text-gray-500 text-sm">atau</span>
          <span className="flex-grow border-t border-gray-300"></span>
        </p>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleOAuth}
            onError={() => showAlert('Google auth gagal')}
          />
        </GoogleOAuthProvider>
      </div>
    </Container>
  );
}
