import { ImageResponse } from '@vercel/og';
// import { NextRequest } from 'next/server';

export const config = {
    runtime: 'experimental-edge',
};

const ImageGenerator = (req: any) => {
    try {
        const { searchParams } = new URL(req.url);

        const hasTitle = searchParams.has('title');
        const hasSubtitle = searchParams.has('subtitle');
        const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'AutoML within your ecosystem';
        const subtitle = hasSubtitle ? searchParams.get('subtitle')?.slice(0, 100) : '';

        return new ImageResponse(
            (
                <div
                    tw='bg-black relative flex h-full w-full justify-center bg-black'
                    style={{ fontFamily: `'Inter', sans-serif`, fontWeight: 600 }}
                >
                    <div
                        tw='bg-[#4800ff]/40  w-1/2 h-2/5 absolute top-1/2 left-1/2'
                        style={{ filter: 'blur(120px)', transform: 'translateX(-50%) translateY(-50%) rotate(6deg)', borderRadius: '75%' }}
                    ></div>
                    <div tw='w-full h-full text-white flex flex-col justify-center items-center'>
                        <div tw='w-1/2 h-2/3 flex flex-col px-10 justify-center items-center'>
                            <img tw='relative mx-0 my-10' alt='Thia.AI' width='100%' src='https://thia.tech/logo/thia-logo-dark.svg' />
                            <h1 tw='text-white font-bold mb-5 text-5xl text-center'>{title}</h1>
                            {hasSubtitle && <h1 tw='text-white text-3xl text-center'>{subtitle}</h1>}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
};

export default ImageGenerator;
