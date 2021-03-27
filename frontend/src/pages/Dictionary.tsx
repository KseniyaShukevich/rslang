import React from "react";
import { Button } from "@material-ui/core";

interface IProps {
  setIsDictionary: (value: boolean) => void
}

const Dictionary: React.FC<IProps> = ({ setIsDictionary }: IProps) => {

  const handleClick = () => {
    setIsDictionary(false);
  }

  return (
    <>
      <div>Dictionary</div>
      <Button onClick={handleClick}>Назад</Button>
    </>
  )
}

export default Dictionary;
