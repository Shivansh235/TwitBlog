import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const currentUserId = userData?.$id || userData?.id || '';
    const currentUserEmail = userData?.email || '';
    const ownerCandidates = [
        post?.userId,
        post?.$createdBy,
        post?.authorId,
        post?.ownerId,
        post?.user?.$id,
        post?.author?.$id,
        post?.userId?.$id,
        post?.userEmail,
        post?.authorEmail,
    ].filter(Boolean);

    const isAuthor = Boolean(
        currentUserId && ownerCandidates.some((value) => {
            if (typeof value === 'object' && value?.$id) {
                return value.$id === currentUserId;
            }
            if (typeof value === 'string') {
                return value === currentUserId || value === currentUserEmail;
            }
            return false;
        })
    ) || Boolean(
        currentUserEmail && ownerCandidates.some((value) => value === currentUserEmail)
    );

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        const imageId = post?.featuredImage || post?.featuredImg;
        appwriteService.deletePost(post.$id).then((status) => {
            if (status && imageId) {
                appwriteService.deleteFile(imageId);
                navigate("/");
            }
        });
    };

    const imageId = appwriteService.normalizeImageValue(post?.featuredImage || post?.featuredImg);
    const previewUrl = imageId ? appwriteService.getFilePreview(imageId) : "";

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-64 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}