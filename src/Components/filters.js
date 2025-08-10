//Filter all completed tasks
export const filterCompltedTask = (data) => {
  let filtered = data.filter((tsk) => {
    if (tsk.completedOn) return true;
    else return false;
  });
  return filtered;
};

//Filter all not started/in progress tasks
export const filterNotCompletedTask = (data) => {
  let filtered = data.filter((tsk) => {
    if (tsk.completedOn && tsk.status == "completed") return false;
    else return true;
  });
  return filtered;
};

//Filter all not in progress tasks
export const filterInProgressTask = (data) => {
  let filtered = data.filter((tsk) => {
    if (!tsk.completedOn && tsk.status == "in progress") return true;
    else return false;
  });
  return filtered;
};

//Filter all not not started tasks
export const filterNotStartedTask = (data) => {
  let filtered = data.filter((tsk) => {
    if (!tsk.completedOn && tsk.status == "not started") return true;
    else return false;
  });
  return filtered;
};
