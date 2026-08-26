import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-12">
                <Container>
                    <section id="about" className="about-section mb-8 rounded-[2rem] border border-slate-200 bg-white/70 p-6 shadow-sm md:p-8">
                        <div className="grid gap-6 md:grid-cols-2 md:items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">About TwitBlog</p>
                                <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)]">Write, publish, and discover ideas worth sharing.</h2>
                            </div>
                            <p className="text-base leading-7 text-[var(--muted)]">
                                TwitBlog is a lightweight blog platform for creators, writers, and teams who want a clean place to post stories, tutorials, and personal updates without the clutter of bloated publishing tools.
                            </p>
                        </div>
                    </section>

                    <div className="empty-state rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
                        <h1 className="text-3xl font-bold text-[var(--text)]">No posts yet</h1>
                        <p className="mt-3 text-sm text-[var(--muted)]">Check "All Posts" or login to create your first article.</p>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-10'>
            <Container>
                <section id="about" className="about-section mb-8 rounded-[2rem] border border-slate-200 bg-white/70 p-6 shadow-sm md:p-8">
                    <div className="grid gap-6 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">About TwitBlog</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)]">Write, publish, and discover ideas worth sharing.</h2>
                        </div>
                        <p className="text-base leading-7 text-[var(--muted)]">
                            TwitBlog is a modern publishing space built for fast ideas, polished stories, and community-driven content. Share your thoughts, feature rich posts, and keep your readers engaged with a clean, focused experience.
                        </p>
                    </div>
                </section>

                <div className='mb-8 flex items-end justify-between gap-4'>
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]'>Latest</p>
                        <h1 className='mt-2 text-3xl font-black tracking-tight text-[var(--text)]'>Blog Posts</h1>
                    </div>
                </div>
                <div className='posts-grid'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home