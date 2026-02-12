import { useState } from "react";
import { storage } from '#imports';
import { ExternalLink, Eye, EyeOff, Save } from "lucide-react";
import useFormData, { ConfigFormValue } from "@/hooks/useFormData";
import toast from "react-hot-toast";

function ConfigForm() {
  const { formData, setFormData } = useFormData();
  const [isHidden, setIsHidden] = useState(true);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await storage.setItem("local:userInfo", formData.userInfo);
    await storage.setItem("local:apiKey", formData.apiKey);
    await storage.setItem("local:provider", formData.provider);

    toast.success("Configuration saved successfully!", {
      style: {
        padding: '4px 8px',
      }
    });

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ConfigFormValue) => ({ ...prev, [name]: value }))
  };

  return (
    <form className='space-y-4 h-auto' onSubmit={submitHandler}>
      {/* //? provider selection */}
      <div>
        <label className='block text-sm font-medium mb-2' htmlFor="provider">Select Provider</label>
        <select
          className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-50 focus:outline-none focus:border-blue-500'
          name="provider"
          id="provider"
          value={formData?.provider}
          onChange={handleChange}
        >
          <option value={'groqai'}>Groq</option>
          <option value={'gemini'}>Gemini</option>
        </select>
        <p className='text-xs text-blue-300 mt-1'>Choose provider to generate smarter responses.</p>
      </div>
        {/* //? api key */}
      <div>
        <label className='block text-sm font-medium mb-2 ' htmlFor="apiKey" > API Key</label>
        <div className="flex">
          <input type={isHidden ? 'password' : 'text'} placeholder='Enter your API key' className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-50 focus:outline-none focus:border-blue-500' name="apiKey" id="apiKey"
            value={formData?.apiKey}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setIsHidden(!isHidden)} className="ml-2 px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-gray-50">
            {isHidden ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        <p className='text-xs text-blue-300 mt-1'>Your Gemini AI API key for personalized data generation</p>
      </div>
{/* //? user information */}
      <div>
        <label className='block text-sm font-medium mb-2' htmlFor="userInfo">User Information</label>
        <textarea placeholder='Enter user information' rows={4} className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-50 focus:outline-none focus:border-blue-500' name="userInfo" id="userInfo"
          value={formData?.userInfo}
          onChange={handleChange}
        ></textarea>
        <p className='text-xs text-blue-300 mt-1'>Provide your personal details for AI to generate contextually relevant data</p>
      </div>

      <button type='submit' className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition inline-flex items-center justify-center gap-2'><Save size={18} /> Save Configuration</button>

    </form>
  )
}

export default ConfigForm;
