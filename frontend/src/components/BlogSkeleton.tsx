
export const BlogSkeleton = () => {
    return  <div role="status" className="max-w-sm animate-pulse ">
                <div className="flex justify-center">
                    <div className="p-4 w-full max-w-6xl cursor-pointer mt-4">
                        <div className="flex">
                            <div className="flex justify-center flex-col">
                                <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                            </div>
                            <div className="pl-2">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="flex pl-2 text-slate-400">
                                &#xb7;
                                <div className="pl-1">
                                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                </div>
                            </div>
                        </div>
                        <div className="font-extrabold text-2xl mt-2">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="font-medium text-slate-500">
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="mt-6 text-sm text-slate-500">   {/* Reading Time */}
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                        <div className="bg-slate-200 h-[1px] w-full mt-4">

                        </div>
                    </div>
                </div>

        <span className="sr-only">Loading...</span>
    </div>    
}