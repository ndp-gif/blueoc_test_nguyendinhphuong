export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface INewPost {
    userId: number;
    title: string;
    body: string;
}

export interface IPostsState {
    posts: IPost[];
    loading: boolean;
    error: string | null;
    addingPost: boolean;
    currentPage: number;
    totalPages: number;
    limit: number;
}