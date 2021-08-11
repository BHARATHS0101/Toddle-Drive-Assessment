declare namespace ReduxNS {
    interface IState {
      Documents: DocumentNS.IState
    }
  
    interface IThunkFunction<Actions> {
        (
            dispatch: import('react').Dispatch<Actions>,
            getAppState: () => ReduxNS.IState,
        ): void;
    }
  }