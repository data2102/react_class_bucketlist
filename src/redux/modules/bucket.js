//bucket.js 
import { firestore } from "../../firebase";

//전역변수로 선언
const bucket_db = firestore.collection("bucket");

// Actions
const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE"; 
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";
const LOADED = "bucket/LOADED";

const initialState = {
  //   list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
  list: [
    { text: "수지랑 결혼하기", completed: false },
    { text: "수지랑 여행가기", completed: false },
    { text: "수지랑 부자되기", completed: false },
  ],
  is_loaded: false
};

// Action Creators
export const loadBucket = (bucket) => {
  return { type: LOAD, bucket };
};

export const createBucket = (bucket) => {
  return { type: CREATE, bucket };
};

export const deleteBucket = (bucket) => {
  return { type: DELETE, bucket };
};

export const updateBucket = (bucket) => {
  return { type: UPDATE, bucket };
};

export const isLoaded = (loaded) => {
  return {type: LOADED, loaded};
}


// 파이어베이스랑 통신하는 부분
export const loadBucketFB = () => {
  return function (dispatch) {
    
    bucket_db.get().then((docs) => {
      let bucket_data = [];

      docs.forEach((doc) => {
        if(doc.exists){
          bucket_data = [...bucket_data, {id: doc.id, ...doc.data()}];
        }
      })

      console.log(bucket_data);
      // 이제 액션 생성 함수한테 우리가 가져온 데이터를 넘겨줘요! 그러면 끝!
      dispatch(loadBucket(bucket_data));
    });
  };
};

export const addBucketFB = (bucket) => {
  return function (dispatch) {
    console.log(bucket);
    // 생성할 데이터를 미리 만들게요!
    let bucket_data = { text: bucket, completed: false };

    dispatch(isLoaded(false));

    // add()에 데이터를 넘겨줍시다!
    bucket_db
      .add(bucket_data)
      .then((docRef) => {
        // id를 추가한다!
        bucket_data = { ...bucket_data, id: docRef.id };

        console.log(bucket_data);

        // 성공했을 때는? 액션 디스패치!
        dispatch(createBucket(bucket_data));
        dispatch(isLoaded(true));
      })
  };
};


export const updateBucketFB = (bucket) => {
  return function (dispatch, getState) {
    const _bucket_data = getState().bucket.list[bucket];
    
    let bucket_data = {..._bucket_data, completed: true};

    if(!_bucket_data.id) {
      return;
    }

    bucket_db.doc(bucket_data.id).update(bucket_data).then(docRef => {
      dispatch(updateBucket(bucket));
    }).catch(error => {
      console.log(error);
    });
  }
}


export const deleteBucketFB = (bucket) => {
  return function (dispatch, getState) {
    const _bucket_data = getState().bucket.list[bucket];

    if(!_bucket_data.id) {
      return;
    }

    bucket_db.doc(_bucket_data.id).delete().then(docRef => {
      dispatch(deleteBucket(bucket));
    }).catch(error => {
      console.log(error);
    });
  }
}


// Reducer
export default function reducer(state = initialState, action) {

  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD": {
      if(action.bucket.length >0){
        return { list: action.bucket, is_loaded: true};
      }

      return state;
    }
    case "bucket/CREATE": {
      const new_bucket_list = [
        ...state.list,
        action.bucket,
      ];
      return { list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const bucket_list = state.list.filter((l, idx) => {
        if (idx !== action.bucket) {
          return l;
        }
      });
      return { list: bucket_list };
    }

    case "bucket/UPDATE": {
      const bucket_list = state.list.map((l, idx) => {
        if (idx === action.bucket) {
        
          return { ...l, completed: true };
        } 

        return l;
      });

      return { list: bucket_list };
    }

    case "bucket/LOADED": {
      return {...state, is_loaded: action.loaded};
    }

    default:
      return state;
  }
}