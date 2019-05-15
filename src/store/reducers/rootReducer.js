import {
  CHECKING_EMAIL,
  EMAIL_CHECKED,
  GEN_GROUP_INVITE,
  SAVE_GROUP_INVITE,
  GET_CURRENT_USER,
  SAVE_CURRENT_USER,
  GET_USER_GROUPS,
  SAVE_USER_GROUPS,
  GET_GROUP_ITEMS,
  SAVE_GROUP_ITEMS,
  CREATE_ITEM,
  ITEM_CREATED,
  UPDATE_ITEM,
  ITEM_UPDATED,
  DELETE_ITEM,
  ITEM_DELETED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  BEGIN_CHECK_OUT,
  CHECK_OUT_COMPLETE,
  GET_GROUP_HISTORY,
  SAVE_GROUP_HISTORY,
  GET_GROUP_USERS,
  SAVE_GROUP_USERS,
  SAVE_USER_PROFILE,
  GET_USER_PROFILE,
  CLEAR_ITEMS,
  CLEAR_GROUP_USERS,
  GET_GROUP_HISTORY_LIST,
  SAVE_GROUP_HISTORY_LIST,
  GET_INVITE_INFO,
  SAVE_INVITE_INFO,
  ACCEPTING_INVITE,
  INVITE_ACCEPTED,
  SAVE_USERNAME,
  SAVE_PROFILEPIC,
  REMOVE_ACCOUNT,
  ERROR,
  CLEAR_ERROR,
  CLEAR_GROUP_HISTORY,
  GET_COMMENTS_START, 
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  DELETE_TASK_START,
  TASK_DELETED,
  DELETE_TASK_FAIL,
  GET_GROUP_TASKS_START, 
  GET_GROUP_TASKS_SUCCESS,
  GET_GROUP_TASKS_FAILURE,
  GET_USER_NAME_START,
  GET_USER_NAME_SUCCESS,
  CREATE_GROUP_TASK,
  GROUP_TASK_CREATED,
  GROUP_TASK_ERROR,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_START,
  // COMMENT_DELETED,
  // DELETE_COMMENT_FAIL
} from "../actions/";

const initialState = {
  currentUser: null,
  userGroups: null,
  groupItems: null,
  needsNewItems: false,
  needsNewHistory: false,
  needsNewGroups: false,
  needsNewHistoryList: false,
  userCart: null,
  groupHistory: null,
  groupHistoryList: null,
  groupUsers: null,
  groupUserProfiles: null,

  invites: null,

  currentGroup: null,
  groups: null,
  items: null,
  emailChecked: false,

  groupTotal: null,

  userTotal: null,
  markedItems: null,
  needsRefresh: false,
  itemPurchasedText: null,

  inviteInfo: null,

  errorMessage: null,
  groupMembers: null,

//***** FairShare***********
  currentGroupTasks: null,
  taskComments: null,
  tempUserName: null

};


export const rootReducer = (state = initialState, action) => {


  switch (action.type) {
    case GET_USER_NAME_START:
      return {...state,
        errorMessage: null
      };
    case GET_USER_NAME_SUCCESS:
      return{
        ...state,
        tempUserName: action.payload
      };

    case GET_GROUP_TASKS_START:
      return {...state,
      errorMessage: null
    };
    case GET_GROUP_TASKS_SUCCESS:
    return {
      ...state,
      currentGroupTasks: action.payload
      };
    case GET_GROUP_TASKS_FAILURE:
    return {
      ...state,
      currentGroupTasks: null,
      errorMessage: action.payload
    };


    case DELETE_TASK_START:
    return state;
  
  case TASK_DELETED:
    return {
      ...state,
      deleteMessage: action.payload,
      errorMessage: null
    };

  case DELETE_TASK_FAIL:
    return {
      ...state,
      deleteMessage: action.payload,
      errorMessage: null
    };

    case GET_COMMENTS_START:
      return {...state,
      errorMessage: null
    };
    case GET_COMMENTS_SUCCESS:
    return {
      ...state,
      taskComments: action.payload,
        errorMessage: null,
      };
    case GET_COMMENTS_FAILURE:
    return {
      ...state,
      taskComments: null,
      errorMessage: action.payload
    };

    case CREATE_COMMENT_START:
    return {
      ...state,
      errorMessage: null
    };
    case CREATE_COMMENT_SUCCESS:
    return {
      ...state,
      // taskComments: action.payload,
      errorMessage: null
    };
    case CREATE_COMMENT_FAILURE:
    return {
      ...state,
      errorMessage: action.payload
    }

    case DELETE_COMMENT_START:
    return state;
  
  // case COMMENT_DELETED:
  //   return {
  //     ...state,
  //     deleteComment: action.payload,
  //     errorMessage: null
  //   };

  // case DELETE_COMMENT_FAIL:
  //   return {
  //     ...state,
  //     deleteComment: action.payload,
  //     errorMessage: null
  //   };



    case CHECKING_EMAIL:
      return state;

    case EMAIL_CHECKED:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null
      };

    case GEN_GROUP_INVITE:
      return state;
    case SAVE_GROUP_INVITE:
      return {
        ...state,
        invites: {
          [action.payload.groupId]: action.payload.inviteUrl
        },
        errorMessage: null
      };

    case GET_CURRENT_USER:
      return state;
    case SAVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null
      };

    case GET_USER_GROUPS:
      return state;
    case SAVE_USER_GROUPS:
      return {
        ...state,
        needsNewGroups: false,
        userGroups: action.payload
      };

    case GET_GROUP_ITEMS:
      return state;
    case SAVE_GROUP_ITEMS:
      let unpurchased = action.payload.data;
      unpurchased = unpurchased.filter(
        item => item.purchased === 0 || item.purchased === false
      );
      if (unpurchased && unpurchased.length === 0) {
        unpurchased = null;
      }
      return {
        ...state,
        groupItems: unpurchased,
        needsNewItems: false,
        errorMessage: null
      };

    case CREATE_ITEM:
      return state;
    case ITEM_CREATED:
      return {
        ...state,
        needsNewItems: true,
        errorMessage: null
      };

    case UPDATE_ITEM:
      return state;
    case ITEM_UPDATED:
      return {
        ...state,
        needsNewItems: true,
        errorMessage: null
      };

    case DELETE_ITEM:
      return state;
    case ITEM_DELETED:
      return {
        ...state,
        needsNewItems: true,
        errorMessage: null
      };

    case ADD_TO_CART:
      let newCart = [];
      if (state.userCart) {
        if (state.userCart.length > 0) {
          newCart = state.userCart;
        }
      }
      newCart.push(action.payload);
      return {
        ...state,
        userCart: newCart,
        needsNewItems: true,
        errorMessage: null
      };
    case REMOVE_FROM_CART:
      let filterCart = state.userCart;
      filterCart = filterCart.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        userCart: filterCart,
        needsNewItems: true,
        errorMessage: null
      };

    case BEGIN_CHECK_OUT:
      return state;
    case CHECK_OUT_COMPLETE:
      return {
        ...state,
        userCart: null,
        needsNewItems: true,
        needsNewHistory: true,
        needsNewHistoryList: true,
        errorMessage: null
      };

    case GET_GROUP_HISTORY:
      return state;
    case SAVE_GROUP_HISTORY:
      return {
        ...state,
        groupHistory: action.payload.data,
        needsNewHistory: false,
        errorMessage: null
      };

    case GET_GROUP_HISTORY_LIST:
      return state;

    case SAVE_GROUP_HISTORY_LIST:
      return {
        ...state,
        groupHistoryList: action.payload.data,
        needsNewHistoryList: false,
        errorMessage: null
      };

    case GET_GROUP_USERS:
      return state;

    case SAVE_GROUP_USERS:
      return {
        ...state,
        groupUsers: action.payload,
        errorMessage: null
      };

    case GET_USER_PROFILE:
      return state;

    case SAVE_USER_PROFILE:
      let profileArray = [];
      // if an array of profiles exists, ensure we don't add duplicates
      if (state.groupUserProfiles) {
        if (state.groupUserProfiles.length > 0) {
          profileArray = state.groupUserProfiles;
          for (let i = 0; i < profileArray.length; i++) {
            if (profileArray[i].id !== action.payload.id) {
              profileArray.push(action.payload);
            }
          }
        }
      } else if (!state.groupUserProfiles) {
        profileArray.push(action.payload);
      }
      return {
        ...state,
        groupUserProfiles: profileArray,
        errorMessage: null
      };

    case CLEAR_ITEMS:
      return {
        ...state,
        groupItems: null,
        errorMessage: null
      };

    case CLEAR_GROUP_USERS:
      return {
        ...state,
        groupUsers: null,
        groupUserProfiles: null,
        errorMessage: null
      };

    case CLEAR_GROUP_HISTORY:
      return {
        ...state,
        groupHistory: null,
        groupHistoryList: null,
      }

    case GET_INVITE_INFO:
      return state;

    case SAVE_INVITE_INFO:
      return {
        ...state,
        inviteInfo: action.payload,
        errorMessage: null
      };

    case ACCEPTING_INVITE:
      return state;

    case INVITE_ACCEPTED:
      return {
        ...state,
        needsNewGroups: true,
        errorMessage: null
      };

    case SAVE_USERNAME:
      const user = {
        createdAt: state.currentUser.createdAt,
        email: state.currentUser.email,
        id: state.currentUser.id,
        name: action.payload,
        profilePicture: state.currentUser.profilePic,
        subscriptionType: state.currentUser.subscriptionType,
        updatedAt: state.currentUser.updatedAt
      };
      return {
        ...state,
        currentUser: user,
        errorMessage: null
      };

    case SAVE_PROFILEPIC:
      const user1 = {
        createdAt: state.currentUser.createdAt,
        email: state.currentUser.email,
        id: state.currentUser.id,
        name: state.currentUser.name,
        profilePicture: action.payload,
        subscriptionType: state.currentUser.subscriptionType,
        updatedAt: state.currentUser.updatedAt
      };
      return {
        ...state,
        currentUser: user1,
        errorMessage: null
      };

    case REMOVE_ACCOUNT:
      return (state = initialState);

    case ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null
      };

      case CREATE_GROUP_TASK:
        return {
          ...state,
          errorMessage: null
        };
        case GROUP_TASK_CREATED:
        console.log(action.payload);
        return {
          ...state,
          //currentGroupTasks: action.payload,
          errorMessage: null
        };
        case GROUP_TASK_ERROR:
        return {
          ...state,
          errorMessage:action.payload
        };

    

    default:
      return state;
  }
};
