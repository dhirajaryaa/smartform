import { ExternalLink } from "lucide-react";
import { ApiInput } from "./ApiInput"

function ConfForm() {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement);
    const apiKey = formData.get('apiKey');
    const userInfo = formData.get('userInfo');
    const dataType = formData.get('dataType');

    console.log({
      apiKey,
      userInfo,
      dataType
    });

    // clear form after submission
    (e.target as HTMLFormElement).reset();
  }
  return (
    <form className='space-y-4' onSubmit={submitHandler}>
      <div>
        <label className='block text-sm font-medium mb-2 ' htmlFor="apiKey" >
          <a href="https://aistudio.google.com/api-keys" target="_blank" className="text-blue-400 hover:text-blue-600 inline-flex items-center gap-1 ">Gemini<ExternalLink size={16}/></a> API Key</label>
        <ApiInput />
        <p className='text-xs text-blue-300 mt-1'>Your Gemini AI API key for personalized data generation</p>
      </div>

      <div>
        <label className='block text-sm font-medium mb-2' htmlFor="userInfo">User Information</label>
        <textarea placeholder='Enter user information' rows={4} className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-50 focus:outline-none focus:border-blue-500' name="userInfo" id="userInfo"></textarea>
        <p className='text-xs text-blue-300 mt-1'>Provide your personal details for AI to generate contextually relevant data</p>
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-medium' htmlFor="dataType">Data Type</label>
        <div className='flex items-center space-x-4'>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input type='radio' name='dataType' value='real' defaultChecked className='w-4 h-4' />
            <span>Real Data</span>
          </label>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input type='radio' name='dataType' value='random' className='w-4 h-4' />
            <span>Random Data</span>
          </label>
        </div>
        <p className='text-xs text-blue-300 mb-2'>Choose between random or personalized data for form filling</p>
      </div>

      <button type='submit' className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition'>Save Configuration</button>


    </form>
  )
}

export { ConfForm }
