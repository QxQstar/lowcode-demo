import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { project, observableProject, observableSkeleton } from './shell'
import { SCHEMA_UPDATED } from './eventType'
import Workbench from './layout/workbench'

export default observer(function Root() {
    useEffect(() => {
        project.emit(SCHEMA_UPDATED)
    },[observableProject.schema])

    return (
    <>
        <Workbench 
            skeleton={observableSkeleton}
            project={observableProject}
        />
    </>
    )
})