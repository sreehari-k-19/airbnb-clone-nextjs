"use client";
import {signIn} from 'next-auth/react';
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
// import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modals from "./Modals";
import Heading from "../Heading";
import Inputs from "../Inputs/Inputs";
import Buttons from "../Buttons";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal =useRegisterModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials',{
      ...data,redirect:false,
    }).then((callback)=>{
      setIsLoading(false)
      if(callback?.ok){
        toast.success(`Logged in`)
        router.refresh()
        loginModal.onClose()
      }
      if(callback?.error){
         toast.error(callback.error)
      }
    })
   
  };
  const toggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen()

  },[loginModal,registerModal])
  
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your acoount" />
      <Inputs
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Inputs
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Buttons
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Buttons
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          First time using Airhub?
          <span
          onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            signin in
          </span>
        </p>
      </div>
    </div>
  );
  
  return (
    <Modals
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
