import { NextPage, NextPageContext } from "next";
import Router from "next/router";

const nameChapterPage: NextPage = () => {
    return <div></div>;
};

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    //Since this is client side only absolute URLs are supported
    //TODO: need to change url off of localhost in production
    const resp = await fetch("http://localhost:3000/api/admin/validateLogin", {
        headers: {
            cookie: cookie!,
        },
    });

    if (resp.status === 401 && !context.req) {
        void Router.replace("/portal/login");
        return { props: {} };
    }

    if (resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            //TODO: same here
            Location: "http://localhost:3000/",
        });
        context.res?.end();
        return { props: {} };
    }

    return { props: {} };
}

export default nameChapterPage;
