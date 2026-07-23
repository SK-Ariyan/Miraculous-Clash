// ==========================
// ROLE FILTER
// ==========================

const RoleFilter = {

    filter(available, needs){

        // 1. Priority is mandatory
        if(needs.needPriority){

            const priority = available.filter(

                kwami => kwami.ai.priority >= 90

            );

            if(priority.length > 0){
                return priority;
            }

        }

        // 2. If no priority needed, don't over-filter.
        // Leave evaluation to Evaluator later.

        return available;

    }

};