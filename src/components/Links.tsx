import { CircleUser, Github, Linkedin, Twitter } from 'lucide-react';

function Links() {
    return (
        <div className='flex gap-4 items-center justify-center mt-4  pt-4 border-t border-gray-700'>
            <a target='_blank' href="https://github.com/dhirajaryaa" className="text-blue-400 hover:text-blue-600 duration-150"><Github size={18} /></a>
            <a target='_blank' href="https://www.linkedin.com/in/dhirajarya01" className="text-blue-400 hover:text-blue-600 duration-150"><Linkedin size={18} /></a>
            <a target='_blank' href="https://x.com/dhirajarya01" className="text-blue-400 hover:text-blue-600 duration-150"><Twitter size={18} /></a>
            <a target='_blank' href="https://dhirajarya.xyz/" className="text-blue-400 hover:text-blue-600 duration-150"><CircleUser size={18} /></a>
        </div>
    )
}

export default Links;
