import create from "zustand"

import {sleep} from "./request"

type State  = {
    user: string;
    count: number;
    list: any[];
    loading: boolean;
    editItem: any;
    setUser: (val: string)=> void;
    setLoading: (val: boolean) => void;
    getList:()=> void;
    removeList: (id: string)=> void;
    editList:(params: any) => void;
    addList:(params: any) => void;
    setEditItem: (params:any) => void;

    addAFish: ()=> void;
    reduceAFish: ()=> void
}

let dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const useStore = create<State>((set,get) => ({
    user: 'cattle',
    count: 0,
    list: [],
    loading: false,
    editItem: undefined,
    setUser: (val) => set({user: val}),
    setLoading: (val) => set({loading: val}),
  
   
    getList: async () => {
      await sleep(1000);
      console.log(dataSource);
      set({ list: dataSource });
    },
    removeList: async (val) => {
      dataSource = dataSource.filter((n) => n.key !== val);
      get().getList();
    },
    editList: async (params: any) => {
      dataSource = dataSource.map((n) => {
        if (n.key === params.key) {
          return { ...n, ...params };
        }
        return n;
      });
      get().getList();
    },
    addList: async (params: any) => {
      dataSource = [{ ...params, key: `${dataSource.length + 1  }` }, ...dataSource];
      get().getList();
    },
    setEditItem: (params: any) => set({ editItem: params }),
    addAFish: () => set({ count: get().count + 1 }),
    reduceAFish: () => set({ count: get().count - 1 }),
}))

export default useStore