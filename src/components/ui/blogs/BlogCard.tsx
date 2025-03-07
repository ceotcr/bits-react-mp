import { IBlog } from "../../../libs/types";

export const BlogCard = ({ blog }: { blog: IBlog }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>

            <p className="text-gray-600">
                {blog.body.length > 100 ? `${blog.body.slice(0, 100)}...` : blog.body}
            </p>

            <div className="flex justify-between items-center mt-4">
                <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag) => (
                        <span key={tag} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3 text-sm text-gray-600">
                    <span>👍 {blog.reactions?.likes ?? 0}</span>
                    <span>👎 {blog.reactions?.dislikes ?? 0}</span>
                    <span>👀 {blog.views ?? 0}</span>
                </div>
            </div>
        </div>
    );
};
