# Information Screen - MVVM Architecture

This directory contains the Information screen and related components implemented using the MVVM (Model-View-ViewModel) architecture pattern.

## Architecture Overview

### 📁 Directory Structure
```
Information/
├── Interfaces/
│   └── CategoryItem.ts                    # Shared data models and interfaces
├── services/
│   └── InformationService.ts              # Business logic and data operations
├── viewmodels/
│   └── InformationViewModel.ts            # State management and business logic
├── views/
│   └── InformationView.tsx                # UI components and presentation logic
├── Information.tsx                        # Main Information component (entry point)
├── InformationFolder.tsx                  # Main InformationFolder component
├── InformationFolderList.tsx              # Main InformationFolderList component
├── InformationDetailItemsScreen.tsx         # Detail screen component
├── InformationDetail.tsx                  # Detail component
├── InformationFolder.tsx                  # Folder component
├── styles.tsx                             # Shared styles
├── index.ts                               # Exports
└── README.md                              # This file
```

## 🏗️ MVVM Components

### Model (`Interfaces/CategoryItem.ts`)
- **Purpose**: Defines data structures and interfaces
- **Contains**: 
  - `CategoryItem` interface
  - `InformationState` interface
  - `InformationFolderState` interface
  - `InformationFolderListState` interface
  - `ApiResponse` interface
  - `RouteParams` interface

### Service (`services/InformationService.ts`)
- **Purpose**: Handles data operations and API calls
- **Responsibilities**:
  - API communication
  - Local database operations (Realm)
  - Data transformation
  - Error handling

### ViewModel (`viewmodels/InformationViewModel.ts`)
- **Purpose**: Manages state and business logic
- **Responsibilities**:
  - State management using React hooks
  - Business logic coordination
  - Data processing and formatting
  - Error handling and user feedback

### View (`views/InformationView.tsx`)
- **Purpose**: Handles UI rendering and user interactions
- **Responsibilities**:
  - Component rendering
  - User interaction handling
  - Navigation
  - Styling

## 🔄 Data Flow

1. **View** → **ViewModel**: User interactions trigger ViewModel methods
2. **ViewModel** → **Service**: ViewModel calls Service methods for data operations
3. **Service** → **API/Local DB**: Service handles data fetching and storage
4. **Service** → **ViewModel**: Service returns data to ViewModel
5. **ViewModel** → **View**: ViewModel updates state, triggering View re-render

## 🚀 Usage

```typescript
import Information from './screens/Information';

// The component automatically uses MVVM architecture
<Information />
```

## ✨ Benefits of MVVM Implementation

1. **Separation of Concerns**: Clear separation between UI, business logic, and data
2. **Testability**: Each layer can be tested independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Reusability**: ViewModel and Service can be reused across different views
5. **Scalability**: Easy to extend and modify functionality

## 🔧 Key Features

- **Offline Support**: Automatic fallback to local data when API fails
- **Error Handling**: Comprehensive error handling at each layer
- **Type Safety**: Full TypeScript support with proper interfaces
- **State Management**: Reactive state management using React hooks
- **Performance**: Optimized rendering with useCallback and proper memoization
- **Grid Layout**: Folders display in a 2-column grid layout
- **Navigation**: Proper navigation handling with route parameters

## 📝 Implementation Details

### Information Component
- **Grid Layout**: Folders display in 2-column grid
- **Loading States**: Proper loading indicators
- **Error Handling**: Comprehensive error handling
- **Offline Support**: Automatic fallback to local data

### InformationFolder Component
- **Grid Display**: Shows all folders in grid layout
- **Direct ViewModel Usage**: Uses ViewModel directly without props
- **Realm Integration**: Direct database operations
- **Loading States**: Proper loading and empty states

### InformationFolderList Component
- **Route Parameters**: Handles navigation parameters
- **Smart Filtering**: Filters items by CategoryFolder
- **Complex Logic**: Implements fallback filtering logic
- **State Management**: Comprehensive state management

## 🎯 Architecture Principles

### Direct ViewModel Usage
- ViewModels are created directly in View components
- No prop drilling required
- Cleaner component structure
- Self-contained components

### Shared Interfaces
- All interfaces centralized in `Interfaces/CategoryItem.ts`
- Consistent type definitions across components
- Easy maintenance and updates
- Type safety across the module

### Service Layer
- Encapsulates all data operations
- Handles API and database interactions
- Provides clean API for ViewModels
- Separates data logic from business logic

## 📋 File Descriptions

- **Information.tsx**: Main entry point for Information screen
- **InformationFolder.tsx**: Main entry point for InformationFolder screen
- **InformationFolderList.tsx**: Main entry point for InformationFolderList screen
- **InformationService.ts**: Handles API and database operations
- **InformationViewModel.ts**: Manages state and business logic
- **InformationView.tsx**: Renders Information screen UI
- **CategoryItem.ts**: Contains all shared interfaces and types
- **index.ts**: Exports for the Information module

## 🔄 Recent Updates

- **Removed Index Files**: InformationFolder and InformationFolderList no longer use index.ts files
- **Direct Imports**: Components import directly from Interfaces folder
- **Simplified Structure**: Cleaner directory organization
- **Shared Types**: All interfaces centralized in one location

## 📝 Notes

- The ViewModel uses React hooks for state management
- The Service handles all data operations including Realm database
- The View is purely presentational and receives data through ViewModel
- All components are properly typed with TypeScript
- No index.ts files in sub-components for simpler structure 