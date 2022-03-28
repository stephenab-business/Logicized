import React, { memo, FC, useEffect } from 'react';

import { Handle, Position, NodeProps, Connection, Edge, useStoreState, ReactFlowState, Node, } from 'inputs-and-outputs-renderer';
import { getInputPosition, getOutputPosition } from '../../../../Functions/gateFunctions'
import './TFlipFlopNode.scss';