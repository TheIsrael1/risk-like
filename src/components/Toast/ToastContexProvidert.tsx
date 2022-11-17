import { createContext, useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import "../../styles/toast.scss"
import { CSSTransition, TransitionGroup } from 'react-transition-group';


interface ToastInterface{
    id: string
    content: string
}


interface ToastContextInterface{
    toasts: ToastInterface[]
    open?: (id: string)=> void
    close?: (id: string)=> void
    closeAll?: ()=>void
    timedToast?: (id: string)=>void
}


const defaultState: ToastInterface[] = []



function generateUEID() {
    let f = (Math.random() * 46656) | 0;
    let s = (Math.random() * 46656) | 0;
    const first = ('000' + f.toString(36)).slice(-3)
    const second = ('000' + s.toString(36)).slice(-3)
  
    return first + second;
}

export const ToastContext= createContext<ToastContextInterface>({toasts: []});
export const useToast = ()=> useContext(ToastContext)

export const ToastContextProvider: React.FC  = ({children}) =>{
    const [toasts, setToasts] = useState<ToastInterface[] | []>(defaultState)
    
    const open =(content: string) => {
        setToasts((prev)=>{
            return[
                ...prev,
               { id: generateUEID(), content}
            ]
        })
    }

    // open and closes at a timeout
    const timedToast = (content: string) =>{
        const id = generateUEID()
        setToasts((prev)=>{
            return[
                ...prev,
                {id , content}
            ]
        })
        setTimeout(()=>close(id), 3000)
    }

    const close = (id: string)=>{
        setToasts((prev)=> prev.filter((toast) => toast.id !== id))
    }

    const closeAll = ()=>{
        setToasts([])
    }

    return(
        <ToastContext.Provider value={{close, toasts, open, closeAll, timedToast}}>
                <div id='ToastNotification'>
                {children}
                {createPortal(
                    <div className='ToastCon'>
                        <TransitionGroup>
                        {toasts?.map?.((toast, idx: number)=>(
                        <CSSTransition
                        key={idx * Math.random()}
                        classNames={{
                            enterActive: 'animate__animated animate__lightSpeedInLeft',
                            exitActive: 'animate__animated animate__lightSpeedOutLeft'
                        }}
                        timeout={200}
                        >
                            <li>
                            <Toast content={toast.content} close={()=>close(toast.id)} />
                            </li>
                        </CSSTransition>
                        ))}
                        </TransitionGroup>
                    </div>,
                    document.body
                    )}
                 </div>
        </ToastContext.Provider>
    )

}
