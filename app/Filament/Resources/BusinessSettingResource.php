<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BusinessSettingResource\Pages;
use App\Models\BusinessSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BusinessSettingResource extends Resource
{
    protected static ?string $model = BusinessSetting::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationGroup = 'Website Settings';
    protected static ?string $pluralLabel = 'Business Details';
    protected static ?string $label = 'Business Detail';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('business_name')->label('Business Name')->required(),
                Forms\Components\Textarea::make('address')->rows(2)->required(),
                Forms\Components\TextInput::make('phone')->label('Phone Number'),
                Forms\Components\TextInput::make('email')->email(),
                Forms\Components\TextInput::make('working_hours')->label('Working Hours')->placeholder('Mon - Fri: 9:00 AM - 5:00 PM'),
                Forms\Components\Section::make('Social Media Links')->schema([
                    Forms\Components\TextInput::make('facebook')->prefixIcon('heroicon-o-link'),
                    Forms\Components\TextInput::make('instagram')->prefixIcon('heroicon-o-link'),
                    Forms\Components\TextInput::make('twitter')->prefixIcon('heroicon-o-link'),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('business_name'),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('phone'),
           Tables\Columns\TextColumn::make('working_hours'),

     // This will display "Not set" if working_hours is null
                Tables\Columns\TextColumn::make('updated_at')->dateTime('M d, Y'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBusinessSettings::route('/'),
            'create' => Pages\CreateBusinessSetting::route('/create'),
            'edit' => Pages\EditBusinessSetting::route('/{record}/edit'),
        ];
    }
}
