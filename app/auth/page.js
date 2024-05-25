import { AuthForm } from "../components/AuthForm/AuthForm"
import Link from "next/link"
import Styles from '../components/AuthForm/AuthForm.module.css'

export default function AuthPage() {
    return (
        <div className={Styles.auth_page}>
            <AuthForm />
            <Link href='/registration'>Регистрация</Link>
        </div>
    )
}