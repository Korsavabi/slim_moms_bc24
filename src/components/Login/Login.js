import React, { useEffect, useState } from "react"
// import { useDispatch } from "react-redux"
import style from './../Registration/Registration.module.css'

const Login = () => {

	const logState = {
		email: "",
		password: "",
	}

	const [logForm, setLogForm] = useState(logState)
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState("Емейл не может быть пустым")
	const [passwordError, setPasswordError] = useState("Пароль не может быть пустым")
	const [formValid, setFormValid] = useState(false)
	// const dispatch = useDispatch()

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	})

	const emailHandler = (e) => {
		setLogForm((prev) => ({ ...prev, email: e.target.value }))
		if (emailDirty) {
			setEmailDirty(false)
		}
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (!e.target.value) {
			setEmailError("Емейл не может быть пустым")
		} else if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError("Некорректный емейл")
		} else {
			setEmailError("")
		}
	}

	const passwordHandler = (e) => {
		setLogForm((prev) => ({ ...prev, password: e.target.value }))
		if (passwordDirty) {
			setPasswordDirty(false)
		}
		if (!e.target.value) {
			setPasswordError("Пароль не может быть пустым")
		} else if (e.target.value.length < 6 || e.target.value.length > 16) {
			setPasswordError("Пароль должен быть длинее 6 символов и короче 16")
		} else {
			setPasswordError("")
		}
	}

	const handleBlur = ({ target }) => {
		switch (target.name) {
			case "email":
				setEmailDirty(true)
				break
			case "password":
				setPasswordDirty(true)
				break
		}
	}


	const handleSubmit = (e) => {
		e.preventDefault()

		// dispatch(authOperations.logIn(logForm)); //отправлять на функцию запросна на бэк
		setLogForm(logState)
	}

	const { email, password } = logForm

	return (
		<section className={style.section}>
			<h2 className={style.title}>Вход</h2>

			<form onSubmit={handleSubmit} className={style.form}>
				<label className={style.label}>
					<p className={style.input__title}>Логин *</p>
					<input
						className={(emailDirty && emailError) ? style.input_err : style.input}
						type="email"
						name="email"
						value={email}
						onChange={emailHandler}
						onBlur={handleBlur}
					/>
				</label>

				<div className={style.contaner__err}>
					{emailDirty && emailError && <p className={style.err__message}>{emailError}</p>}
				</div>

				<label className={style.label}>
					<p className={style.input__title}>Пароль *</p>
					<input
						className={(passwordDirty && passwordError) ? style.input_err : style.input}
						type="password"
						name="password"
						value={password}
						onChange={passwordHandler}
						onBlur={handleBlur}
					/>
				</label>

				<div className={style.contaner__err}>
					{passwordDirty && passwordError && <p className={style.err__message}>{passwordError}</p>}
				</div>

				<div className={style.con__btns}>
					<button disabled={!formValid} className={style.login__btn} type="submit">
						Вход
					</button>
					<button className={style.registration__btn}>Регистрация</button>
				</div>
			</form>
		</section>
	)
}

export default Login
