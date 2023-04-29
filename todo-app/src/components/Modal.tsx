import { Todo } from "~/typing"
import Form from "./Form"

interface IModal {
    todo?: Todo,
    closeModal: () => void
}

const Modal: React.FC<IModal> = ({ todo, closeModal }) => {
    return (
        <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="flex justify-center items-center fixed top-0 left- right-0 z-50  w-full p-2 overflow-x-hidden overflow-y-auto md:inset-1 h-[calc(100%-1rem)] max-h-full">
            <div className="w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-100">
                    <div className="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <Form todo={todo} close={closeModal} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal