
interface IStore {

  diaries: IDiary[];
}

interface IDiary {
  date?: string;
  title?: string;
  body?: string;
  isGoalOfTheDay: boolean;
  id: string;
}