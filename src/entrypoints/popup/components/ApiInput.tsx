import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function ApiInput() {
    const [isHidden, setIsHidden] = useState(true);
    return (
        <div className="flex">
            <input type={isHidden ? 'password' : 'text'} placeholder='Enter your API key' className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-50 focus:outline-none focus:border-blue-500' name="apiKey" id="apiKey" />
            <button onClick={() => setIsHidden(!isHidden)} className="ml-2 px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-gray-50">
                {isHidden ? <Eye size={18}/> : <EyeOff size={18}/>}
            </button>
        </div>
    )
}

export { ApiInput }
