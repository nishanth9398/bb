import * as w from '../../constants/swipe';

// -------------------------------- SWIPE CARDS --------------------------------
export const listSwipeReducer = (state = {}, action) => {
  switch (action.type) {
    case w.LIST_SWIPE_REQUEST:
      return { loading: true };

    case w.LIST_SWIPE_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.LIST_SWIPE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getSwipeProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case w.GET_SWIPE_PROFILE_REQUEST:
      return { loading: true };

    case w.GET_SWIPE_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.GET_SWIPE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case w.GET_SWIPE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

// -------------------------------- LIKES --------------------------------
export const listLikesReducer = (state = {}, action) => {
  switch (action.type) {
    case w.LIST_LIKES_REQUEST:
      return { loading: true };

    case w.LIST_LIKES_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.LIST_LIKES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case w.LIKE_PROFILE_REQUEST:
      return { loading: true };

    case w.LIKE_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.LIKE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case w.LIKE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const removeLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case w.REMOVE_LIKE_REQUEST:
      return { loading: true };

    case w.REMOVE_LIKE_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.REMOVE_LIKE_FAIL:
      return { loading: false, error: action.payload };

    case w.REMOVE_LIKE_RESET:
      return {};

    default:
      return state;
  }
};

// -------------------------------- MATCHES --------------------------------
export const listMatchesReducer = (state = {}, action) => {
  switch (action.type) {
    case w.LIST_MATCH_REQUEST:
      return { loading: true };

    case w.LIST_MATCH_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.LIST_MATCH_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteMatchReducer = (state = {}, action) => {
  switch (action.type) {
    case w.DELETE_MATCH_REQUEST:
      return { loading: true };

    case w.DELETE_MATCH_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.DELETE_MATCH_FAIL:
      return { loading: false, error: action.payload };

    case w.DELETE_MATCH_RESET:
      return {};

    default:
      return state;
  }
};

// -------------------------------- CHATS --------------------------------
export const listChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case w.LIST_CHATS_REQUEST:
      return { loading: true };

    case w.LIST_CHATS_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.LIST_CHATS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getChatReducer = (state = {}, action) => {
  switch (action.type) {
    case w.GET_CHAT_REQUEST:
      return { loading: true };

    case w.GET_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.GET_CHAT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createChatReducer = (state = {}, action) => {
  switch (action.type) {
    case w.CREATE_CHAT_REQUEST:
      return { loading: true };

    case w.CREATE_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };

    case w.CREATE_CHAT_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteChatReducer = (state = {}, action) => {
  switch (action.type) {
    case w.DELETE_CHAT_REQUEST:
      return { loading: true };

    case w.DELETE_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.DELETE_CHAT_FAIL:
      return { loading: false, error: action.payload };

    case w.DELETE_CHAT_RESET:
      return {};

    default:
      return state;
  }
};
