export type fetchedData = {
    _id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: string,
    updatedAt: string,
  };
 export type MyProps = {
    isNewTask: Boolean;
    setIsNewTask: React.Dispatch<React.SetStateAction<boolean>>;
  };
  export type editProps = {
    data: fetchedData[];
    editId: string;
    setIsNewTask: React.Dispatch<React.SetStateAction<boolean>>;
  }