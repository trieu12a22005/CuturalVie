import React from "react";
import { useState } from "react";
import Rule from "./Rule";
import Game from "./Game";
import Layout from "../../../components/Layout";
function Index() {
  let [active, setActive] = useState(false);
  if (!active) return <Rule setActive={setActive} />;
  return (
    <div className="h-screen bg-[url('/bg/bg3.png')] bg-cover bg-center w-full overflow-hidden flex flex-col justify-between ">
      <Game />
    </div>
  );
}

export default Index;
