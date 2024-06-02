import 'bootstrap/dist/css/bootstrap.css'
import '../../resources/styles/_icon.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../resources/routes-constants'

import ToolsContentManager from '../../display/pages/ToolsContentManager'
import ToolsWarbandBuilder from '../../display/pages/ToolsWarbandBuilder'
import path from 'path'

import { ContentPackManager } from '../../classes/contentpacks/contentmanager'

const ToolsRoute: React.FC = () => {

    // Initialize Controller //
    const ContentManager = new ContentPackManager;

    // Return result -----------------------------
    return (
        <Routes>
            <Route path={ROUTES.TOOLS_CONTENT_UPLOAD_ROUTE} element={<ToolsContentManager manager={ContentManager}/>} />
            <Route path={ROUTES.TOOLS_WARBAND_BUILDER_ROUTE} element={<ToolsWarbandBuilder/>} />
        </Routes>
    )
    // -------------------------------------------
}

export default ToolsRoute