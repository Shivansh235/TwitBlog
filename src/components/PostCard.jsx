import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage, featuredImg}) {
    const imageId = appwriteService.normalizeImageValue(featuredImage || featuredImg);
    const imageUrl = imageId ? appwriteService.getFilePreview(imageId) : "";

    return (
    <Link to={`/post/${$id}`} className='block h-full group'>
        <div className='post-card h-full'>
            <div className='relative mb-4 overflow-hidden rounded-2xl bg-slate-200'>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className='h-48 w-full object-cover transition duration-300 group-hover:scale-105'
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className='flex h-48 w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100 text-sm font-medium text-[var(--muted)]'>
                        No Image
                    </div>
                )}
            </div>
            <div className='flex items-center justify-between gap-3'>
                <h2 className='text-xl font-bold text-[var(--text)]'>{title}</h2>
                <span className='rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]'>Read</span>
            </div>
        </div>
    </Link>
  )
}


export default PostCard