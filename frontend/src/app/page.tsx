import JoinPoll from "@/components/join";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <div className="">
   <nav className="fixed top-0 w-full">
    <Navbar />
   </nav>
   <main className="mt-16  pt-16 flex justify-center w-full" >
    <div  className="max-w-7xl">

    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-8">
      <div className="text-3xl font-medium">Live Polling, Surveys and Quizes</div>
      <div className="text-xl">SentiSurvey is a one stop platform for livepolling, conducting online surveys and live quizes with realtime interaction with users</div>
      <div className="flex gap-4 items-center">
        <Button>Create a Poll</Button>
        <span>or</span>
        <JoinPoll></JoinPoll>
      </div>
      </div>
       
    </div>
    </div>
   </main>
   </div>
  );
}
