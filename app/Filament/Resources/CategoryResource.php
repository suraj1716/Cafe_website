<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Categories';
    protected static ?string $pluralModelLabel = 'Categories';
    protected static ?string $modelLabel = 'Category';




public static function form(Form $form): Form
{
    return $form
        ->schema([
            // Category Details Section
            Section::make('Category Details')
                ->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),

                    FileUpload::make('image')
                        ->image()
                        ->directory('categories')
                        ->nullable(),

                    Textarea::make('description')
                        ->rows(3)
                        ->nullable(),
                ]),

            // Menu Items Section
            Section::make('Menu Items')
                ->schema([
                    Repeater::make('menuItems')
                        ->relationship('menuItems')
                        ->createItemButtonLabel('Add Menu Item')
                        ->schema([
                            Grid::make(3)->schema([
                                TextInput::make('name')->required(),
                                TextInput::make('size')->placeholder('Small / Medium / Large'),
                                TextInput::make('price')->numeric()->prefix('$')->required(),
                            ]),
                            Textarea::make('description')->rows(2)->columnSpanFull(),
                            FileUpload::make('image')->image()->directory('menu_items')->nullable()->columnSpanFull(),
                        ])
                        ->columns(1), // Repeater itself takes full width
                ]),
        ]);
}



    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('description')
                    ->limit(50),

                TextColumn::make('image')
                    ->label('Image')
                    ->formatStateUsing(fn ($state) => $state ? "<img src='/storage/$state' class='h-12 w-12 object-cover rounded'>" : null)
                    ->html(),

                TextColumn::make('created_at')
                    ->dateTime('M d, Y'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
