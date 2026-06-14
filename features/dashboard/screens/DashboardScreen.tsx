import React from 'react';
import {SafeAreaContainer} from "../../../shared/components/SafeLayoutContainer";

import Metrics from "../component/Metrics";
import QuickActions from "../component/QuickActions";

function DashboardScreen() {
    return (
        <SafeAreaContainer>
          <Metrics/>
            <QuickActions/>
        </SafeAreaContainer>
    );
}
export default DashboardScreen;