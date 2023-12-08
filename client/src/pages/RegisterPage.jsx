import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth.context";


export function RegisterPage() {

    const { register, handleSubmit } = useForm();
    const { signup } = useAuth()
    
    function classStyleImput() {
        return "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
    }

    const onSubmit = handleSubmit(  async (values) => {
        signup(values)
    })

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md" >
            <form onSubmit={onSubmit}>
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <label htmlFor="username">Username</label>
                <input type="text" className={classStyleImput()} placeholder="Insert your Username"{...register("username", { required: true })} />
                
                <label htmlFor="email">Email</label>
                <input type="email" className={classStyleImput()}placeholder="Insert your Email" {...register("email", { required: true })} />

                <label htmlFor="password">Password</label>
                <input type="password" className={classStyleImput()}placeholder="Insert yout Password" {...register("password", { required: true })} />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}