import Box from "@mui/material/Box";
import Candidates from "@/app/Candidates/page";
import {Nav} from "@/components/Nav/Nav";

export default function Home() {

  return (
      <>

        {<MainContent />}
      </>
  )

}
function MainContent() {

  return (

    <Box  className="flex  h-full w-full items-center justify-center  font-sans    flex-col"
          sx={{transition: "box-shadow 0.3s ease, background-color 0.3s ease"}}>
        <Candidates></Candidates>
    </Box>
  );
}
