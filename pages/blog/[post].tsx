import React from 'react';

type Props = {};

const Blog = (props: Props) => {
    return <div>Blog</div>;
};

export const getServerSideProps = async ({ params }: any) => {

    return { props: params };
};

export default Blog;
